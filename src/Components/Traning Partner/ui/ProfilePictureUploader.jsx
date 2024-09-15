import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components(shadcn)/ui/button';
import { Input } from '@/components(shadcn)/ui/input';
import { toast } from 'react-toastify';
import { server } from '@/main';

const ProfilePictureUploader = ({ studentId }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    useEffect(() => {
        const uploadStatus = localStorage.getItem(`profilePictureUploaded_${studentId}`);
        if (uploadStatus === 'true') {
            setIsUploaded(true);
        }
    }, [studentId]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setIsUploaded(false);
        localStorage.setItem(`profilePictureUploaded_${studentId}`, 'false');
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
            const uploadUrl = `${server}/student/profile/${studentId}`;
            const response = await axios.put(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(response.data.message);
            setFile(null);
            setIsUploaded(true);
            localStorage.setItem(`profilePictureUploaded_${studentId}`, 'true');
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
                    disabled={isUploaded}
                />
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading || isUploaded}
                >
                    {isUploading ? 'Uploading...' : isUploaded ? 'Uploaded' : 'Upload Image'}
                </Button>
            </div>
        </div>
    );
};

export default ProfilePictureUploader;
