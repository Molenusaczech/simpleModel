# SimpleModel

A web based application based on three js to create 3D models easily.

## Getting Started

### Online
You can try the app [here](https://simple-model.vercel.app/).

### Local
1. Clone the repo
    ```sh
    git clone https://github.com/Molenusaczech/simpleModel
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Run the app
    ```sh
    npx vite
    ```
4. The app will be running on localhost:5173

## Adding new models
1. Add the STL file to the /models folder
2. Create the script to load the model in scripts.js (see newdog.js for example)
3. Add the script import to lib/scriptHandler.js (the const scripts array)

## Credits
Toothpaste squeezer: 
CC-BY 4.0 https://www.printables.com/cs/model/26897-toothpaste-squeezer
