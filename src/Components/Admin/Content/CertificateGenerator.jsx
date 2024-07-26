import React, { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import JSZipUtils from 'jszip-utils';
import fontkit from '@pdf-lib/fontkit';

const CertificateGenerator = () => {
    const [jsonData, setJsonData] = useState({
        name: "John Doe",
        date_of_issue: "2024-07-25",
        place_of_issue: "New Delhi",
        grade: "A",
        state: "Delhi",
        district: "Central",
        center_Name: "Training Center 1",
        NSQF_level: "Level 5",
        duration: "6 months",
        qualification: "Advanced Skill",
        Ward: "Son",
        enrolment_No: "AWUPB000100000-081214",
        dob: "1990-01-01",
        credits: "20"
    });

    const generateCertificate = async () => {
        // Fetch the DOCX template
        JSZipUtils.getBinaryContent('/certificate.docx', async (error, content) => {
            if (error) {
                console.error('Error fetching the DOCX template:', error);
                return;
            }

            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
                delimiters: { start: '[[', end: ']]' }  // Custom delimiters
            });

            // Set the template variables
            doc.setData(jsonData);

            try {
                // Render the document
                doc.render();

                const out = doc.getZip().generate({
                    type: 'uint8array',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                });

                // Convert the DOCX content to a readable string
                const docxText = await new Response(out).text();

                // Load custom font
                const fontUrl = '/NunitoSans_10pt-Regular.ttf'; // Ensure this path is correct
                const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

                // Convert DOCX to PDF
                const pdfDoc = await PDFDocument.create();
                pdfDoc.registerFontkit(fontkit);
                const font = await pdfDoc.embedFont(fontBytes);
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();

                // Split the DOCX text into lines to draw on PDF
                const lines = docxText.split('\n');

                let yOffset = height - 50;

                lines.forEach((line) => {
                    page.drawText(line, {
                        x: 50,
                        y: yOffset,
                        size: 12,
                        font,
                        color: rgb(0, 0, 0),
                    });
                    yOffset -= 20; // Adjust line height as necessary
                });

                const pdfBytes = await pdfDoc.save();
                saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'certificate.pdf');
            } catch (error) {
                console.error('Error generating certificate:', error);
            }
        });
    };

    return (
        <div>
            <button onClick={generateCertificate}>Generate Certificate</button>
        </div>
    );
};

export default CertificateGenerator;
