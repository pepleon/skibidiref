const { Router } = require("express");

const router = Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validator = require("validator");

router.post('/create-referral', async (req, res) => {
  const { email, name, friendemail, friendname, category } = req.body;

  try {
     
    if (!validator.isEmail(email)){
      throw new Error("Your email address is invalid");
  }
  if (!validator.isEmail(friendemail)){
    throw new Error("Your friend's email is invalid");
}
     
    const newReferral = await prisma.referral.create({
      data: {
        email: email,
        name: name,
        friendemail: friendemail,
        friendname: friendname,
        category: category
      }
    });

    console.log("New referral created:", newReferral);
    res.status(201).json(newReferral); 
  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
});





module.exports = router;