const Category=require("../models/Category");


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//setting tags
exports.setCategory=async (req,res)=>{
    try{
        //fetching data
        const {name,description}=req.body;

        //applying validation checks
        if(!name || !description)
        {
           return res.status(400).json({
                success:false,
                message:"Please Enter all fields carefully"
            });
        }

        // inserting category in db

        const existedCategory=await Category.findOne({name});

        if(existedCategory){
            return res.status(409).json({
                success:false,
                message:"Category already present in database"
            });
        }

        const newCategory=await Category.create({name,description});

        return res.status(200).json({
            success:true,
            message:"Category inserted successfully in database",
            newCategory,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while inserting Category into database",
            data:error.message
        });
    }
}


//controller for getting all tags

exports.getCategories=async (req,res)=>{
    try{
        const allCategory=await Category.find({},{name:true,description:true,_id:true});

        if(!allCategory)
        {
            return res.status(404).json({
                success:false,
                message:"No Category found",
                
            });
        }

        res.status(200).json({
            success:true,
            message:"Category fetched successfullly from database",
            allCategory
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while fetching Category from database",
            data:error.message
        });
    }
}

exports.categoryPageDetails=async (req,res)=>{
    try{
        //fetching data
        const {categoryId}=req.body;
        
        //validation
        if(!categoryId){
            return res.status(404).json({
                success:false,
                message:"No CategoryId found"
            });
        }

        //getting categorty data
        const selectedCategory=await Category.findById(categoryId)
                                            .populate({
                                                path:"course",
                                                match:{status:"Published"},
                                                populate:"ratingAndReviews",
                                                populate:"instructor"
                                            }).exec();     
       
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"No data found for Selected Categories"
            });
        }

        //getting courses for different category
        const categoriesExceptSelected=await Category.find({_id:{$ne:categoryId}});
        
        let differentCategories=await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id)
                                                        .populate({
                                                            path:"course",
                                                            match:{status:"Published"},
                                                            populate:"ratingAndReviews",
                                                            populate:"instructor"
                                                        }).exec();

        if(!differentCategories){
            return res.status(404).json({
                success:false,
                message:"No data found for differentCategories"
            });
        }

        //TODO find all courses in bestseller categories
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10)

        //return response
        return res.status(200).json({
            success:true,
            selectedCategory,
            differentCategories,
            mostSellingCourses
        }); 

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while getting Category Data",
            error:error.message
        });
    }   
}