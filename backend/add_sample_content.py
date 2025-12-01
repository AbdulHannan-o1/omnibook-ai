import asyncio
import os
import glob
from backend.services.llm_service import llm_service
from backend.db.vector_store import vector_store
from backend.utils.mdx_utils import extract_plain_text_from_mdx
from dotenv import load_dotenv
import uuid
import tiktoken # For tokenizing and chunking

load_dotenv()

async def add_sample_book_content():
    print("Adding book content to Qdrant...")

    documents_to_upsert = []
    mdx_files = glob.glob("book/docs/**/*.mdx", recursive=True)

    # Initialize tiktoken encoder
    # Using 'cl100k_base' as a common encoder, adjust if a different model is used by the LLM
    encoding = tiktoken.get_encoding("cl100k_base")

    for mdx_file in mdx_files:
        with open(mdx_file, "r") as f:
            mdx_content = f.read()

        plain_text = extract_plain_text_from_mdx(mdx_content)

        # Extract metadata from file path
        # Example: book/docs/chapter-1-introduction-to-physical-ai-and-humanoid-robotics.mdx
        relative_path = os.path.relpath(mdx_file)
        chapter_title = os.path.basename(mdx_file).replace(".mdx", "").replace("-", " ").title()

        # Simple chunking logic
        tokens = encoding.encode(plain_text)
        chunk_size = 500
        overlap = 100

        for i in range(0, len(tokens), chunk_size - overlap):
            chunk_tokens = tokens[i : i + chunk_size]
            chunk_text = encoding.decode(chunk_tokens)

            # Simple section/page for now, can be improved with more sophisticated parsing
            section = f"Part {i // (chunk_size - overlap) + 1}"
            page = (i // (chunk_size - overlap)) + 1

            embedding = await llm_service.get_embedding(chunk_text)
            if embedding:
                documents_to_upsert.append({
                    "id": str(uuid.uuid4()),
                    "vector": embedding,
                    "payload": {
                        "chapter": chapter_title,
                        "section": section,
                        "source": relative_path,
                        "page": page,
                        "content": chunk_text
                    }
                })

    if documents_to_upsert:
        await vector_store.upsert_documents(documents_to_upsert)
        print(f"Successfully added {len(documents_to_upsert)} document chunks to Qdrant.")
    else:
        print("No documents to upsert.")

if __name__ == "__main__":
    asyncio.run(add_sample_book_content())
