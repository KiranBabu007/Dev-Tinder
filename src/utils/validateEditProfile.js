

const validateEditProfile = (data) => {
   allowed=["firstName","lastName","age","gender"]
   isallowed=Object.keys(data).every((key) => allowed.includes(key))

   return isallowed

}

module.exports = { validateEditProfile }
