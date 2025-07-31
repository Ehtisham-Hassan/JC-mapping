import API_URL from '../../config/api';

export interface MappingResponse {
  data: string[][];
  headers: string[];
  message: string;
  rows: number;
  columns: number;
  file_path: string;
  response: any;
}

export const generateAISuggestedMappings = async (fileId: string): Promise<MappingResponse> => {
  const response = await fetch(`${API_URL}/mapping/ai-suggested?file_id=${fileId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    alert(`HTTP error! status: ${response.status}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}; 