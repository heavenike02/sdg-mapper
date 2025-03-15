import { put } from '@vercel/blob'
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const filename = req.query.filename as string

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' })
    }

    // Parse the form data using formidable
    const form = formidable({})
    const [fields, files] = await form.parse(req)
    
    // Get the uploaded file
    const file = Array.isArray(files.file) ? files.file[0] : null
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Read the file from disk
    const fileData = fs.readFileSync(file.filepath)
    
    // Upload to Vercel Blob
    const response = await put(filename, fileData, {
      access: 'public',
      contentType: file.mimetype || 'application/octet-stream',
    })

    // Clean up the temp file
    fs.unlinkSync(file.filepath)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error uploading file:', error)
    return res.status(500).json({ error: 'Failed to upload file' })
  }
} 