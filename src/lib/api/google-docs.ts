const DOCS_API_URL = 'https://docs.googleapis.com/v1';

export interface GoogleDoc {
  documentId: string;
  title: string;
  body?: {
    content: unknown[];
  };
}

/**
 * Create a new Google Doc
 */
export async function createDocument(
  title: string,
  accessToken: string
): Promise<GoogleDoc> {
  const response = await fetch(`${DOCS_API_URL}/documents`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Docs API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get document content
 */
export async function getDocument(
  documentId: string,
  accessToken: string
): Promise<GoogleDoc> {
  const response = await fetch(`${DOCS_API_URL}/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Docs API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Insert text at the beginning of a document
 */
export async function insertText(
  documentId: string,
  text: string,
  accessToken: string
): Promise<void> {
  const response = await fetch(
    `${DOCS_API_URL}/documents/${documentId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text,
            },
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Docs API error: ${response.statusText}`);
  }
}

/**
 * Create a document with content and move to folder
 */
export async function createDocumentWithContent(
  title: string,
  content: string,
  folderId: string,
  accessToken: string
): Promise<string> {
  // Create the document
  const doc = await createDocument(title, accessToken);

  // Insert content
  await insertText(doc.documentId, content, accessToken);

  // Move to folder using Drive API
  const { moveFileToFolder } = await import('./google-drive');
  await moveFileToFolder(doc.documentId, folderId, accessToken);

  return doc.documentId;
}

/**
 * Extract plain text from document body
 */
export function extractTextFromDocument(doc: GoogleDoc): string {
  if (!doc.body?.content) {
    return '';
  }

  let text = '';

  const extractFromElement = (element: unknown): void => {
    if (!element || typeof element !== 'object') return;

    const el = element as Record<string, unknown>;

    if (el.paragraph) {
      const paragraph = el.paragraph as Record<string, unknown>;
      const elements = paragraph.elements as unknown[];

      if (Array.isArray(elements)) {
        for (const elem of elements) {
          const e = elem as Record<string, unknown>;
          if (e.textRun) {
            const textRun = e.textRun as Record<string, string>;
            text += textRun.content || '';
          }
        }
      }
    }

    if (el.table) {
      const table = el.table as Record<string, unknown>;
      const rows = table.tableRows as unknown[];

      if (Array.isArray(rows)) {
        for (const row of rows) {
          const r = row as Record<string, unknown>;
          const cells = r.tableCells as unknown[];

          if (Array.isArray(cells)) {
            for (const cell of cells) {
              const c = cell as Record<string, unknown>;
              const cellContent = c.content as unknown[];

              if (Array.isArray(cellContent)) {
                for (const item of cellContent) {
                  extractFromElement(item);
                }
              }
            }
          }
        }
      }
    }
  };

  for (const element of doc.body.content) {
    extractFromElement(element);
  }

  return text;
}
