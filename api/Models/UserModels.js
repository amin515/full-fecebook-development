
import mongoose from "mongoose";



const userSchema = mongoose.Schema({

    first_name : {
        type : String,
        required : true,
        trim : true
    },
    sur_name : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        trim : true
    },
    secondary_name : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        trim : true
    },
    auth : {
        type : String,
        trim : true
    },
    cell : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
   
    gender : {
        type : String,
        enum : ['Female', 'Male', 'custom']
    },
    birth_date : {
        type : String,
        required : true
    },
    birth_month : {
        type : String,
        required : true
    },
    birth_year : {
        type : String,
        required : true
    },
   
    profile_photo : {
        type : String,
        default : null
    },
    cover_photo : {
        type : String,
        default : null
    },
    bio : {
        type : String,
        default : null
    },
    category : {
        type : String,
        default : null
    },
    work : {
        type : Array,
        default : []
    },
    collage_versity : {
        type : Array,
        default : []
    },
    primary : {
        type : Array,
        default : []
    },

    living : {
        type : String,
    },
   
    hometown : {
        type : String,
    },
    relationship : {
        type : String,
        enum : ['Marridge', 'Single', 'In a Relationship']
      },

      joined : {
        type : Date
      },

      social : {
        type : Array,
        default : []
    },
      friends : {
        type : Array,
        default : []
    },
      featured : {
        type : Array,
        default : []
    },
      flowing : {
        type : Array,
        default : []
    },
      flowers : {
        type : Array,
        default : []
    },
      request : {
        type : Array,
        default : []
    },
      block : {
        type : Array,
        default : []
    },
      posts : {
        type : Array,
        default : []
    },
    isActivate : {
        type : Boolean,
        default : false,
    },
    access_token : {
      type : String
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    trash : {
        type : Boolean,
        default : false,
    },
    status : {
        type : Boolean,
        default : true,
    },
}, {
    timestamps : true
})

// export schema
export default  mongoose.model('Users', userSchema);