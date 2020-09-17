import React from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import {setUsersEmails} from '../../actions/cohort';

export function ExcelLoader({setUsersEmails}) {
    var XLSX = require("xlsx");
    
    function Upload() {
        const fileUpload = (document.getElementById('fileUpload'));
        const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            let fileName = fileUpload.files[0].name;
            if (typeof (FileReader) !== 'undefined') {
                const reader = new FileReader();
                if (reader.readAsBinaryString) {
                    reader.onload = (e) => {
                        processExcel(reader.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                }
            } else {
                console.log("This browser does not support HTML5.");
            }
        } else {
            console.log("Please upload a valid Excel file.");
        }
    }
    
    function processExcel(data) {
        const workbook = XLSX.read(data, {type: 'binary'});
        const firstSheet = workbook.SheetNames[0];
        const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        
        setUsersEmails(excelRows);
        console.log(excelRows);
    }
    
    return (
        
         <Typography component="h3" variant="h6" color="secondary" >

           <input class="input-group" color="primary" type="file" id="fileUpload" onChange={() => Upload()}/>
       
        </Typography>
       
  );
}

function mapStateToProps(state) {
    return {
      emails: state.cohort.emails
    };
  }
  
  function mapDispatchToProps(dispatch) {
     return {
      setUsersEmails: emails => dispatch(setUsersEmails(emails))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExcelLoader);
