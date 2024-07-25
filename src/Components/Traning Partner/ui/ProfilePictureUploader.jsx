import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components(shadcn)/ui/button';
import { Input } from '@/components(shadcn)/ui/input';
import { Label } from '@/components(shadcn)/ui/label';
import { toast } from 'react-toastify';

const ProfilePictureUploader = ({ studentId }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const uploadUrl = `http://localhost:8000/api/v1/student/profile/${studentId}`;
            const response = await axios.put(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(response.data.message);
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload profile picture');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <Input 
                    type="file" 
                    id={`file-upload-${studentId}`} 
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <Button 
                    onClick={handleUpload} 
                    disabled={!file || isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                </Button>
            </div>
        </div>
    );
};

export default ProfilePictureUploader;