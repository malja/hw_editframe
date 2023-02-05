# Editframe Take-Home

Hi,

Thank you for your interest in working with us at Editframe. Congratulations; you've made it to the next round! This is the technical assessment where you can finally demonstrate your development skills. The assignment is relatively straightforward and should take no more than 3 hours to complete. You **do not** have to record yourself, but that would certainly be considered as a bonus.

## Summary

The goal of this exercise is to see how you handle gluing several systems together. We will also determine how you handle new documentation and work with the Editframe API. `https://editframe.com/docs`

## Deliverables

1) Create a script that generates a 7 second video clip using the editframe-js SDK
    - Script must be built using Typescript but compiled to javascript
    - Include 1 audio layer via a URL
    - Include 1 text layer
    - Include 1 image layer via a URL
1) Create a backend (of your choice) that handles incoming HTTP requests
    - POST /videos/create route must trigger an execution of the above script
      - Execution must be offloaded to a job during the request
      - Once executed; download the video file from Editframe
      - Call an ffmpeg command to turn the video file into a .mp3 file
    - GET /videos route must return list of videos returned from `https://api.editframe.com/v2/videos`

1) (If time permits) Create a single route web application using Vue or React
    - Display a TailwindCSS styled list of your fetched /videos route

## Delivery

All portions of the system should be bundled as a monorepo. Please provide operating instructions as a README.md in each folder. I'll bring my own Editframe API token for testing.

Upload your monorepo to a Github repository. This can be private. If it is private, please invite me to your repository: @brycedev

## Notes

If you have problems creating an Editframe account, acquiring an API token, or achieving successful video encodes, please reach out as soon as possible when starting the assignment, so I can assist. 
