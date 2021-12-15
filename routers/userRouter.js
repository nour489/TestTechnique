const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      passwordVerify
    } = req.body;
    //validation
    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields"
        });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password at least 6 characters",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice",
      });

    const existingUser = await Models.User.findOne({
      email: email
    });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists!",
      });

    //Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save new user in the DB
    const newUser = new Models.User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // sign the token


    // send the token in HTTP-only cookie
    res.send("user registred");
  } catch (err) {
    logger(req, 5, err)
    res.status(500).send();
  }
});


router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    //validation
    if (!email || !password) {
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields"
        });
    }

    const existingUser = await Models.User.findOne({
      email: email
    }).select('+passwordHash');
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Wrong email or password"
      });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        errorMessage: "Wrong email or password"
      });
    }

    // sign the token
    const token = jwt.sign({
      sub: existingUser.email,
      //exp: new Date(new Date().getTime() + 60 * 60 * 24 * 1000).now, // 24 hours
    }, ENV.JWT_SECRET, {
      algorithm: 'HS512'
    });

    // send the token in HTTP-only cookie

    res
      .cookie("token", "Bearer " + token, {
        httpOnly: true,
      })
      .send({
        token: token
      });
  } catch (err) {
    logger(req, 5, err)
    res.status(500).send();
  }
});

router.get("/logout", async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    logger(req, 5, err)
    res.status(500).send();
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, ENV.JWT_SECRET);
    res.send(true);
  } catch (err) {
    logger(req, 5, err)
    res.status(500).send();

  }
});



router.post("/changePassword", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    //validation
    if (!email || !password)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields"
        });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password at least 6 characters",
      });




    //Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await Models.User.updateOne({
      email: email
    }, {
      passwordHash: passwordHash
    });

    // send the token in HTTP-only cookie
    res.send({
      message: "password changed successfully"
    });
  } catch (err) {
    logger(req, 5, err)
    res.status(500).send();
  }
});




module.exports = router;
