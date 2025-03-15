'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, UserCircle2, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfilePictureUploadProps {
  defaultImage?: string
  onFileChange: (file: File | null) => void
  className?: string
}

export function ProfilePictureUpload({
  defaultImage,
  onFileChange,
  className
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      
      // Pass the file to parent component for later upload
      onFileChange(file)
    } catch (error) {
      console.error('Error handling file:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative group mb-4">
        <Avatar className="h-28 w-28 cursor-pointer border-2 border-muted">
          <AvatarImage src={preview || ''} className="object-cover" />
          <AvatarFallback className="bg-muted">
            <UserCircle2 className="w-14 h-14 text-muted-foreground" />
          </AvatarFallback>
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </Avatar>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-picture"
          onChange={handleFileChange}
        />
      </div>
      <Button
        variant={preview ? "outline" : "default"}
        size="sm"
        asChild
        className="min-w-[120px] flex gap-2 items-center"
      >
        <label htmlFor="profile-picture" className="cursor-pointer">
          <Camera className="h-4 w-4" />
          <span>{isLoading ? 'Processing...' : preview ? 'Change photo' : 'Upload photo'}</span>
        </label>
      </Button>
    </div>
  )
} 