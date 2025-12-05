import re

def extract_plain_text_from_mdx(mdx_content: str) -> str:
    """
    Removes JSX blocks, import/export statements, and UI syntax from MDX content
    to extract plain text.
    """
    # Remove JSX blocks (e.g., <Component ... /> or <Component>...</Component>)
    # This is a simplified regex and might need refinement for complex JSX cases.
    mdx_content = re.sub(r'<[^>]+>.*?<\/[^>]+>', '', mdx_content, flags=re.DOTALL)
    mdx_content = re.sub(r'<[^>]+\/>', '', mdx_content)

    # Remove import/export statements
    mdx_content = re.sub(r'^(import|export) .*$', '', mdx_content, flags=re.MULTILINE)

    # Remove Docusaurus-specific UI syntax or other common MDX elements
    # For example, `---` YAML front matter delimiters
    mdx_content = re.sub(r'---', '', mdx_content)
    # Remove any remaining HTML-like tags (e.g., <details>, <summary>)
    mdx_content = re.sub(r'<[^>]+>', '', mdx_content)

    # Clean up multiple newlines
    mdx_content = re.sub(r'\\n\\n\\n+', '\\n\\n', mdx_content)

    return mdx_content.strip()
