import React, { useState } from 'react';
import { Rings } from 'react-loader-spinner';
import './Items.css'
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, TextField, ThemeProvider, createTheme, outlinedInputClasses} from '@mui/material';
import { useTheme } from '@emotion/react';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#ffffff',
            '--TextField-brandBorderHoverColor': '#ffffff',
            '--TextField-brandBorderFocusedColor': '#ffffff',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'var(--TextField-labelColor)', 
            '&.Mui-focused': {
              color: 'var(--TextField-labelFocusedColor)',
            },
          },
        },
      },
    },
  });
function Items( {notif} ) {
    const [isAnno, setIsAnno] = useState(false);
    const [annotation, setAnnotation] = useState("");
    const theme = createTheme({
        palette: {
          primary: {
            main: '#090909',
           },
        },
      });
    const theme2 = createTheme({
        palette: {
          primary: {
            main: '#ffffff',
           },
        },
      });
    const outerTheme = useTheme();
    const [image, setImage] = useState(null);
    const [generating, setGenerating] = useState(false);
    async function query(data) {
        try {
            setGenerating(true); // Set loading state when making API request
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            console.log(result);
            setImage(result);
            // notif({ text : "could not generate", err : true});
        } catch (error) {
            notif({ text : "could not generate", err : true});
        } finally {
            setGenerating(false);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.text.value){
            query({ "inputs" :  e.target.text.value});
        }else{
            notif({text : "Input is needed", err : true})
        }
    }
    const handleEdit = () => {
        setImage(null)
    }
    const getAnno = () => {
        setIsAnno(true);
    }
    const anno = (e) => {
        e.preventDefault();
        setAnnotation(e.target.text.value);
        setIsAnno(false);
    }
    return (
        <>
                <div className='grid-nonimage' >
            {image
                ?
                <div className='image-container'>
                    <div className='image-container2' >
                        <img className='grid-image' src={URL.createObjectURL(image)} alt="" />
                        <div className='edit-panel' >
                            <ThemeProvider theme= {theme} >
                                <Button onClick={getAnno} variant="outlined" color='primary'>Annotations</Button>
                            </ThemeProvider>
                            <div className='edit-icon'>
                                <IconButton onClick={handleEdit} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </div>
                        {
                            annotation &&
                            <div className='anno-panel' >
                                <span className='anno-text'>
                                    {annotation}
                                </span>
                            </div>
                        }
                    </div>
                    {
                        isAnno && 
                        <form className="form-anno" onSubmit={anno}>
                            
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <TextField id="outlined-search" className='anno-input' label="Type image annotation" type="text"  name = 'text' />
                            </ThemeProvider>
                            <ThemeProvider theme={theme2}>
                            <div className='btn-anno' >
                               <div className='btn-add' >
                                  <Button type='submit' variant="outlined" color='primary'>Add</Button>
                                </div> 
                                <Button onClick={() => setIsAnno(false)} variant="outlined" color='primary'>Cancel</Button>
                            </div>
                            </ThemeProvider>
                        </form>
                    }
                </div>
                :

                (
                    generating ? 
                    <Rings
                        height="80"
                        width="80"
                        color="black"
                        radius="6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                        />
                    :
                    <form className='form' onSubmit={handleSubmit}>
                        <TextField id="outlined-search" label="Type your prompt" type="text" name = 'text' />
                        <div className='btn' >

                        <ThemeProvider theme={theme}>
                            <Button type='submit' variant="outlined" color='primary'>Generate</Button>
                        </ThemeProvider>
                        </div>
                    </form>
                )
            }
            </div>
        </>
    )
}

export default Items