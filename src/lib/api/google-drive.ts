const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  modifiedTime?: string;
}

export interface DriveFilesResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

/**
 * List documents in a Google Drive folder
 */
export async function listDocuments(
  folderId: string,
  accessToken: string,
  pageToken?: string
): Promise<DriveFilesResponse> {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id,name,mimeType,createdTime,modifiedTime),nextPageToken',
    orderBy: 'modifiedTime desc',
    pageSize: '20',
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const response = await fetch(`${DRIVE_API_URL}/files?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Drive API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get file metadata
 */
export async function getFileMetadata(
  fileId: string,
  accessToken: string
): Promise<DriveFile> {
  const response = await fetch(
    `${DRIVE_API_URL}/files/${fileId}?fields=id,name,mimeType,createdTime,modifiedTime`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Drive API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Download file content
 */
export async function downloadFile(
  fileId: string,
  accessToken: string
): Promise<string> {
  const response = await fetch(
    `${DRIVE_API_URL}/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Drive API error: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Move file to a folder
 */
export async function moveFileToFolder(
  fileId: string,
  folderId: string,
  accessToken: string
): Promise<void> {
  // Get current parents
  const fileResponse = await fetch(
    `${DRIVE_API_URL}/files/${fileId}?fields=parents`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!fileResponse.ok) {
    throw new Error(`Drive API error: ${fileResponse.statusText}`);
  }

  const file = await fileResponse.json();
  const previousParents = file.parents?.join(',') || '';

  // Move to new folder
  const response = await fetch(
    `${DRIVE_API_URL}/files/${fileId}?addParents=${folderId}&removeParents=${previousParents}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Drive API error: ${response.statusText}`);
  }
}
