# Space Product Configurator (Nintendo Switch)

# Description

A product configurator built with React Three Fiber. Allows a user to in real-time edit the colors of a 3D model of a Nintendo Switch.

With a fun little space theme, you can watch the game console float freely whilst rotating about with a starry backdrop complete with our planet and moon in the background.

# Images

<p align = "center">
 <img src = "src\assets\images\switch_one.png" alt = "front">
 <img src = "src\assets\images\switch_two_.png" alt = "bottom">
</p>

# How to Run Demo

Simply open the link here: [pending link]

Or if you want to open it up yourself: - Clone the repo - run npm install to download all the packages - run npm start

# Motivation

A while ago, I came across [Microsoft's XBox Design Lab](https://www.microsoft.com/store/configure/xbox-design-lab/900WZDF9XJVG) website. An extremely customizable product configurator where I could order a custom xbox controller and swap colors for every little aspect of it, from the body, dpad, thumbstick, to the little buttons on it. Interested to see how it worked, I decided to open the inspector and realized for every possible custization possible, they had an image url for it. Doing some calculations, I realized just the d-pad and thumbstick combinations would yield in 400 different combinations (20 different colors for each part) already! That was impossible for me to replicate on my own, so I took to Reddit's r/webdev forumns and consulted users for their expertise and for them to point me in the right direction in this post here [How do online storefront create images for highly customizable products?](https://www.reddit.com/r/webdev/comments/onlxuo/how_do_online_storefront_create_images_for_highly/)

Amongst the various solutions I got, including one where someone physically took professional images of a Xbox Controller on a stand and digitially cut out the customizable parts into individual images to digitially re-color and put back together with HTML/CSS and Z-indexes, I decided to go after the Three.JS approach recommended by a few users.

After following some guides, [blogs](https://official-osorina.medium.com/creating-a-3d-configurator-with-nuxt-and-three-js-part-1-6d40da0209e0), reading some documentation, and etc. I eventually built this project. It takes inspiration from XBox Design Labs in UI styling.

# Challenges

Some of the tricky challenges for this project of course included learning Three JS and React Three Fiber and all about 3D models, normal maps, texture maps. But otherwise I had some bugs that took some work to figure out.

## Various Model Authors using different schemes for their model data

- My approach was to take a model's object and extract their meshes using array.filter(), then to pass this array of references to the meshes to another component that reads it and allows you to edit their colors.

- What I found was that after making it work for one particular 3D model I had downloaded from SketchFab, I wanted to use another model and realized it no longer worked because both model authors used different ways of naming their object's properties, so my array.filter() wasn't working. I had assumed it was standardized or automated or something when the objects got compiled and exported from whatever they were using to make the models.

- Thankfully, I found that was actually the case if you access the "materials" rather some other part of the object. After some refactoring of my code, I could now theoretically support editing and swapping out of multiple models if I wanted to.

## Maximum update depth exceeded. This can happen when a component calls setState inside useEffect Bug

- I was attempting to use the react useEffect Hook to set a state variable called "meshes_array". I gave it an empty array as a depedency, meaning that useEffect would only be called on initial render, yet for some reason, I was getting an infinite loop of setState calls.

- In the end, I realized that because my meshes_array was made by calling an array.filter() method, which essentially returns a reference to a new array every time even if the values are the same, it kept thinking that I was setting a new array. The solution ended up being fairly simple once I found the cause. Simply do a deep by value comparison, and if they were the same, do not call the setState function.

## Loading 3D Objects as a JSX Component for React

- Importing the 3D Object into the scene itself isn't hard at all and there's [documentation](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models) for it, but I wanted to import the JSX component from src>components folder as this is sort of the standard for React practices that I've been taught.

- Unfortunately, the documentation reads "This whole section will assume you have placed your models in the public folder or in a place in your application where you can import them easily." However, attempting to import 3D JSX components from src>components while reading their textures and gltf file from the public folder results in an error as I'd be attempted to read a file in another folder that is above and outside of it's scope. And putting the 3d model textures and etc into the component folder also did not work as it would be unable to find the textures. In the end, I just went with the documentation's recommended way.

# Conclusion

A lot of my time was spent messing around with custom models and tinkering with ThreeJS. That's why there'll be a lot of un-used assets and components in the files of various things. It was a very learn as you go approach where I experimented with random things then tossed them aside if I didn't think they were necessary. Very different than some of the guided tutorial projects that I sometimes work on that have a set goal and purpose and end point. In retrospect, knowing what I know now, this project isn't that difficult, but it was my first forray into ThreeJS and I intend to go further as it's responsible for some of the coolest webpages I've ever seen.

# Credits for Nintendo Switch Model

author: SalvaVelarte (https://sketchfab.com/SalvaVelarte)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/nintendo-switch-19d52d793b8a47ef949c44e7879827e2
title: Nintendo Switch
