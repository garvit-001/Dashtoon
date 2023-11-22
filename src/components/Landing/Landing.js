import React from 'react'
import './Landing.css'
function Landing() {
  return (
    <div className='land-cover'>
        <h1>Welcome to Your ComicStaan</h1>


        <div className='instruct' >
            <p className='inst-head' >
                To create your custom comic panel, to turn your imaginations into images, follow these simple steps:
            </p>
            <p  id='inst' >
                Enter a prompt in the input field. This can be a phrase, sentence, or idea that will inspire your comic.
            </p>
            <p id='inst'>
                Click the "Generate" button to see your unique comic image based on the provided prompt.
            </p>
            <p id='inst'>
                Use the "Add Annotations" to include captions, or any additional text to your comic.
            </p>
            <p id='inst'>
                Finally, click the "Save Comic" button to save your masterpiece!
            </p>
        </div>

        <p className='inst-end' >
            Have fun creating your comics!
        </p>
    </div>
  )
}

export default Landing