import axios from "axios";

export const getProducts = async (req, res) => {
  try {
    const { role } = req.body;
    if (role) {
      const response = await axios.get("https://fakestoreapi.com/products");
      return res.send(response.data);
    }
  } catch (err) {
    return res.send(err);
  }
}

export const addProducts = async (req,res) =>{
    try{
        const {title, price, description, category, image} = req.body;
        const response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                image: image,
                category: category
            })
        });
        const json = await response.json();
        console.log(json);
        return res.send(json);
    }catch(err){
        return res.send(err);
    }
}


export const updateProducts = async (req,res) =>{
    try{
        const { id, title, price, description, category, image } = req.body;
        if(!id) return res.send("Product ID is required.");
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                image: image,
                category: category
            })
        });
        const json = await response.json();
        return res.send(json);
    }catch(err){
        return res.send(err);
    }
}

export const deleteProducts = async (req,res) =>{
    try{
        const { id } = req.body;
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"DELETE"
        });
        return res.send("Product deleted successfully.");
    }catch(err){
        return res.send(err);
    }
}
