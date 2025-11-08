import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface RouteParams {
  params: { id: string };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    
    // Path to the JSON file in the public directory
    const jsonDirectory = path.join(process.cwd(), 'public', 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/mps.json', 'utf8');
    
    // Parse the JSON data
    const data = JSON.parse(fileContents);
    
    // Find the MP with the matching ID
    const mp = data.find((mp: any) => mp.id === id);
    
    if (!mp) {
      return NextResponse.json(
        { error: 'MP not found' },
        { status: 404 }
      );
    }
    
    // Return the MP data as JSON
    return NextResponse.json(mp);
  } catch (error) {
    console.error('Error reading mps.json:', error);
    return NextResponse.json(
      { error: 'Failed to load MP data' },
      { status: 500 }
    );
  }
}
