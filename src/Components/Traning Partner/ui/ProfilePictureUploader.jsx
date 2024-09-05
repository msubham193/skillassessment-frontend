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
        // Check if the profile picture has already been uploaded
        const uploaded = localStorage.getItem(`profile-uploaded-${studentId}`);
        if (uploaded) {
            setIsUploaded(true);
        }
    }, [studentId]);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setIsUploaded(false);
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


            localStorage.setItem(`profile-uploaded-${studentId}`, true); // Save the upload state
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload profile picture');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={`file-upload-${studentId}`} className="block text-sm font-medium text-gray-700">
                Upload Profile Picture
            </Label>
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

                    disabled={isUploaded || isUploading}
                    className={`w-full px-4 py-2 border rounded-md ${isUploaded ? 'cursor-not-allowed' : ''}`}
                />
              
                </Button>
            </div>
            {isUploaded && (
                <p className="text-sm text-green-500">Profile picture has been uploaded. You cannot upload again.</p>
            )}
        </div>
    );
};

export default ProfilePictureUploader;
