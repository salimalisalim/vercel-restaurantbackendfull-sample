const Restaurant = require("../models/restaurantModel");

exports.registerRestaurant = async (req,res)=>{

    // console.log(req.file);
    
    const {restaurantName, restaurantAddress, restaurantNeighborhood} = req.body;

    const selectedPic = req.file?.path ?? '';

    try {
        
        const restaurant = await Restaurant.create({
            restaurantName,
            restaurantAddress,
            restaurantNeighborhood,
            photograph:selectedPic,
        });

        if(!restaurant){
            return res.status(500).json({
                success:false,
                message:"Restaurant registration failed!",
            });
        }

        res.status(201).json({
            success:true,
            message:"Restaurant registration successfully completed!",
            restaurant
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,

        })
    }

    

}

exports.getRestaurants = async(req,res)=>{

    try {

        const restaurants = await Restaurant.find();

        if(!restaurants){
            return res.status(404).json({
                success:false,
                message:"Restaurants not found!",
            });
    
    }

    res.status(200).json({
        success:true,
        restaurants
    })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,

        })
    }

}

exports.updateRestaurant = async(req,res)=>{


    const restaurantID = req.params.id;

    const {name, address, neighborhood, cuisine} = req.body;

    console.log(req.body);


    const selectedPic = req.file?.path ?? '';

    try {

        const restaurant = await Restaurant.findById(restaurantID);

        if(!restaurant){
            return res.status(404).json({success:false, message: 'Restaurant not found'});
    
        }
        
        restaurant.name = name;
        restaurant.address = address;
        restaurant.neighborhood = neighborhood;
        restaurant.cuisine = cuisine;
        restaurant.photograph = selectedPic;

        restaurant.save();

        console.log("after update------------->", restaurant);

        res.status(200).json({
            success:true, 
            message: 'Restaurant updated successfully!'
        });



    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }

}