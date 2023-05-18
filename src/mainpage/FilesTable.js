import React, { useEffect, useState } from 'react';
import { storage,firebase } from '../firebase'; 
import '../Css/FilesTables.css'


const FilesTable = () => {
  const [files, setFiles] = useState([]);
  const [expandedFile, setExpandedFile] = useState(null);

  useEffect(() => {
    // Retrieve files from Firebase Storage
    const storageRef = firebase.storage().ref('');
    storageRef
      .listAll()
      .then((result) => {
        const filesArray = result.items.map((item) => item.name);
        setFiles(filesArray);
      })
      .catch((error) => {
        console.error('Error retrieving files:', error);
      });
  }, []);

  const handleFileClick = (fileName) => {
    // Toggle expanded file
    setExpandedFile((prevExpandedFile) =>
      prevExpandedFile === fileName ? null : fileName
    );
  };

  const handleFileDownload = async (fileName) => {
    // Download the file
    const storageRef = firebase.storage().ref();
    const fileUrl = await storageRef.getDownloadURL();
    window.open(fileUrl);
  };

  const handleFileSubmit = (fileName) => {
    // Update Firestore with resume submitted status
    const db = firebase.firestore();
    db.collection('resumes')
      .doc(fileName)
      .set({ resumeSubmitted: true })
      .then(() => {
        console.log('Resume submission status updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating resume submission status:', error);
      });
  };

  return (
    <div>
      
        <table className="files-table">
          <thead>
            <tr>
              <th>Resume which need referral</th>
            </tr>
          </thead>
          <br></br>
          {files.length === 0 ? (
        <p class = 'noresumes'>Currently no Resumes, will be shared with you shortly.</p>
      ) : (
        
          <tbody>
            {files.map((fileName) => (
              <React.Fragment key={fileName}>
                <tr
                  onClick={() => handleFileClick(fileName)}
                  className={`file-row ${
                    expandedFile === fileName ? 'expanded' : ''
                  }`}
                >
                  <td>{fileName}</td>
                  <td>
                    <button
                      onClick={() => handleFileDownload(fileName)}
                      className="download-button"
                    >
                      Download
                    </button>
                  </td>
                </tr>
                {expandedFile === fileName && (
                  <tr>
                    <td colSpan="2">
                      <div className="expanded-row">
                        <input
                          type="checkbox"
                          id="resumeSubmitted"
                          name="resumeSubmitted"
                        />
                        <label htmlFor="resumeSubmitted">Resume Submitted</label>
                        <button
                          onClick={() => handleFileSubmit(fileName)}
                          className="submit-button"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
      )}
        </table>
    </div>
  );
};

export default FilesTable;
