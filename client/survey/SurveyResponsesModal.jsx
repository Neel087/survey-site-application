import React, { useEffect, useState } from 'react';
import { Modal, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';

const SurveyResponsesModal = ({ open, onClose, surveyData, selectedSurvey }) => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const csvRows = surveyData.reduce((rows, survey) => {
      survey.answers.forEach((answer) => {
        rows.push({
          'Survey Title': survey.surveyTitle,
          'Submission Date': new Date(survey.created_at).toLocaleString('en-US'),
          'Question Title': answer.questionTitle,
          'Selected Answer': answer.selectedAnswer,
        });
      });
      return rows;
    }, []);
    setCsvData(csvRows);
  }, [surveyData]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          backgroundColor: 'white',
          padding: '32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h6">Responses for Survey: {selectedSurvey.name}</Typography>
          <Button variant="outlined" color="primary">
            <CSVLink data={csvData} filename={`${selectedSurvey.name}_responses.csv`}>
              Export CSV
            </CSVLink>
          </Button>
        </div>
        <TableContainer style={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Submission Date</TableCell>
                <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Question Title</TableCell>
                <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Selected Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveyData.map((survey, index) => (
                <TableRow key={index}>
                  <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                    {new Date(survey.created_at).toLocaleString('en-US')}
                  </TableCell>
                  <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                    <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
                      <TableBody>
                        {survey.answers.map((answer, answerIndex) => (
                          <TableRow key={answerIndex}>
                            <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                              {answer.questionTitle}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                    <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
                      <TableBody>
                        {survey.answers.map((answer, answerIndex) => (
                          <TableRow key={answerIndex}>
                            <TableCell style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                              {answer.selectedAnswer}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default SurveyResponsesModal;
