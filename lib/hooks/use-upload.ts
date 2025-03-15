import { useState } from 'react'

interface UploadResponse {
  url: string
  pathname: string
}

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = async (file: File): Promise<UploadResponse | null> => {
    try {
      setIsUploading(true)
      setError(null)

      const filename = encodeURIComponent(file.name)
      
      // Create a FormData object
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      return data
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return { upload, isUploading, error }
} 