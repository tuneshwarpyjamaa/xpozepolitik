import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Path to the JSON file in the public directory
    const jsonDirectory = path.join(process.cwd(), 'public', 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/mps.json', 'utf8');
    
    // Parse the JSON data
    const data = JSON.parse(fileContents);
    
    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading mps.json:', error);
    return NextResponse.json(
      { error: 'Failed to load MP data' },
      { status: 500 }
    );
  }
}
