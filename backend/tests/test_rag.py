import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock, patch
import os

# Assuming these are the paths to your modules
from backend.services.llm_service import LLMService
from backend.db.vector_store import VectorStore
from backend.utils.mdx_utils import extract_plain_text_from_mdx

# --- Test for MDX Preprocessing --- #
def test_extract_plain_text_from_mdx():
    mdx_content = """
---
title: Test Chapter
---

import { SomeComponent } from './SomeComponent';

# Chapter Title <MyJSXComponent prop="value" />

This is some **markdown** content.

<details><summary>Toggle</summary><div>Hidden content</div></details>

export const someVar = "hello";
"""
    expected_plain_text = "# Chapter Title\n\nThis is some **markdown** content.\n\nHidden content"
    # The regex might remove extra newlines, so we'll strip and compare
    result = extract_plain_text_from_mdx(mdx_content).strip()
    assert result == expected_plain_text.strip()

# --- Fixtures for Mocking --- #
@pytest.fixture
def mock_vector_store():
    with patch('backend.db.vector_store.QdrantClient') as MockQdrantClient:
        mock_client = MockQdrantClient.return_value
        mock_client.search = AsyncMock()
        mock_client.upsert = AsyncMock()
        mock_vector_store_instance = VectorStore()
        mock_vector_store_instance.client = mock_client
        yield mock_vector_store_instance

@pytest.fixture
def llm_service_with_mocks(mock_vector_store):
    with patch('backend.services.llm_service.SentenceTransformer') as MockSentenceTransformer,
         patch('backend.services.llm_service.CrossEncoder') as MockCrossEncoder,
         patch('backend.services.llm_service.LitellmModel') as MockLitellmModel:

        # Mock Embedding Model
        mock_embedding_model = MockSentenceTransformer.return_value
        mock_embedding_model.encode.return_value = [[0.1] * 1024]  # 1024-dim embedding

        # Mock Reranker
        mock_reranker = MockCrossEncoder.return_value
        mock_reranker.predict.return_value = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]

        # Mock LitellmModel for query rewriting
        mock_litellm_model = MockLitellmModel.return_value
        mock_litellm_model.generate_text = AsyncMock(return_value="rewritten query about AI planning")

        # Instantiate LLMService with mocks
        service = LLMService()
        service.embedding_model = mock_embedding_model
        service.reranker = mock_reranker
        service.model = mock_litellm_model # for query rewriting
        service.vector_store = mock_vector_store
        yield service

# --- Tests for LLMService --- #
@pytest.mark.asyncio
async def test_get_embedding(llm_service_with_mocks):
    embedding = await llm_service_with_mocks.get_embedding("test query")
    assert isinstance(embedding, list)
    assert len(embedding) == 1024  # Ensure 1024-dim
    llm_service_with_mocks.embedding_model.encode.assert_called_once()

@pytest.mark.asyncio
async def test_rag_search_no_rewrite(llm_service_with_mocks, mock_vector_store):
    # Mock Qdrant search to return documents with payloads
    mock_vector_store.client.search.return_value = [        MagicMock(payload={"content": f"doc {i} content", "chapter": f"Chapter {i}"}) for i in range(10)
    ]

    result = await llm_service_with_mocks.rag_search("test query", rewrite_query=False)

    mock_vector_store.client.search.assert_called_once_with(
        collection_name=llm_service_with_mocks.vector_store.collection_name,
        query_vector=[0.1] * 1024,
        limit=10,
        with_payload=True
    )
    llm_service_with_mocks.reranker.predict.assert_called_once()
    assert len(result) == 5  # Rerank limit
    assert "doc 0 content" in result[0]["content"] # Ensure top document is returned as payload

@pytest.mark.asyncio
async def test_rag_search_with_rewrite(llm_service_with_mocks, mock_vector_store):
    mock_vector_store.client.search.return_value = [        MagicMock(payload={"content": f"doc {i} content", "chapter": f"Chapter {i}"}) for i in range(10)
    ]

    result = await llm_service_with_mocks.rag_search("original query", rewrite_query=True)

    llm_service_with_mocks.model.generate_text.assert_called_once() # Query rewrite should be called
    assert "doc 0 content" in result[0]["content"]

# --- Tests for VectorStore (mocking Qdrant interactions) --- #
@pytest.mark.asyncio
async def test_vector_store_search_with_payload(mock_vector_store):
    # Mock search result from Qdrant client
    mock_hits = [
        MagicMock(payload={"content": "Doc1 content", "chapter": "Chapter 1"}),
        MagicMock(payload={"content": "Doc2 content", "chapter": "Chapter 2"})
    ]
    mock_vector_store.client.search.return_value = mock_hits

    query_embedding = [0.5] * 1024
    documents = await mock_vector_store.search(query_embedding, limit=2, with_payload=True)

    mock_vector_store.client.search.assert_called_once_with(
        collection_name=mock_vector_store.collection_name,
        query_vector=query_embedding,
        limit=2,
        with_payload=True
    )
    assert len(documents) == 2
    assert documents[0]["content"] == "Doc1 content"
    assert documents[0]["chapter"] == "Chapter 1"

@pytest.mark.asyncio
async def test_vector_store_upsert_documents(mock_vector_store):
    test_documents = [
        {"id": "1", "vector": [0.1]*1024, "payload": {"content": "test1"}},
        {"id": "2", "vector": [0.2]*1024, "payload": {"content": "test2"}}
    ]

    await mock_vector_store.upsert_documents(test_documents)

    mock_vector_store.client.upsert.assert_called_once()