import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const OUTPUT_FIELDS = [
  'author',
  'title',
  'lines',
  'linecount'
];


export default function Form({ setResults }) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [outputFields, setOutputFields] = useState(OUTPUT_FIELDS);

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleOutputFieldsChange = (event) => {
    const {
      target: { value },
    } = event;
    setOutputFields(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = () => {
    const uri = constructUri();
    axios.get(uri)
    .then((response) => {
      setResults(response.data);
    })
    .catch((error) => {
      setResults(error)
    })
  }

  const constructUri = () => {
    // construct URI
    let uri = `https://poetrydb.org`;
    let searchParams = [];
    let searchTerms = [];

    // add search params
    if (title !== '') {
      searchParams.push('title');
      searchTerms.push(title);
    }
    if (author !== '') {
      searchParams.push('author');
      searchTerms.push(author);
    }
    if (searchParams.length > 0) {
      uri += '/';
      for (const searchParam of searchParams) {
        uri += `${searchParam},`;
      }
    }

    // add search terms
    if (searchTerms.length > 0) {
      uri += '/';
      for (const searchTerm of searchTerms) {
        uri += `${searchTerm};`;
      }
    }

    // add output fields
    if (outputFields.length > 0) {
      uri += '/';
      for (const [i, outputField] of outputFields.entries()) {
        uri += `${outputField}`;
        if (i !== outputFields.length - 1) {
          uri += ',';
        }
      }
    }

    return uri;
  }

  return (
    <div>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Author"
        value={author}
        onChange={handleAuthorChange}
      />
      <br />
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <FormControl sx={{ m: 2, width: '50ch' }}>
        <InputLabel id="demo-multiple-checkbox-label">Output Fields</InputLabel>
        <Select
          multiple
          value={outputFields}
          onChange={handleOutputFieldsChange}
          input={<OutlinedInput label="Output Fields" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {OUTPUT_FIELDS.map((field) => (
            <MenuItem key={field} value={field}>
              <Checkbox checked={outputFields.indexOf(field) > -1} />
              <ListItemText primary={field} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Button 
        sx={{ m: 2 }}
        variant="contained" 
        endIcon={<SendIcon />}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
    </div>
  )
}
