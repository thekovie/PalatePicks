<template>
  <div class="my-10 mx-40"> <!--Content Section-->

    <div class="flex flex-row items-center"> <!--Profile Section-->

      <div> <!--Avatar-->
        <img src="../../assets/images/user.jpg" alt="Avatar" class="w-12 h-12 rounded-full me-3"/>
      </div>

      <div class="basis-3/4">  <!--User-->
        <p class="font-bold text-xl">@Tofudubu (Kovie Niño)</p>
        <p>Your Personal Account</p>
      </div>

      <div class="basis-1/4 text-right pe-20"> <!--Go back to personal profile-->
        <p class="underline">Go Back to Personal Profile</p>
      </div>

    </div>

    <div> <!--Edit Section-->

      <div> <!--General-->

        <div>
          <p class="font-bold text-xl border-b border-green mt-10">General</p>
        </div>

        <form @submit.prevent="saveChanges">
          <div class="flex">
            <div class="basis-3/4">
              <div class="flex"> <!--Name-->
                <div class="basis-1/2 mt-5 me-10">
                  <label>First Name<br></label>
                  <input type="text" v-model="firstName" class="border-green border rounded w-full px-2" @click="clickTextBox">
                </div>
                <div class="basis-1/2 mt-5">
                  <label>Last Name<br></label>
                  <input type="text" v-model="lastName" class="border-green border rounded w-full px-2" @click="clickTextBox">
                </div>
              </div>
              <div class="mt-5"> <!--Username-->
                <label>Username<br></label>
                <input type="text" v-model="username" class="border-green border rounded w-full px-2" @click="clickTextBox">
              </div>
              <div class="mt-5"> <!--School-->
                <label>School/University<br></label>
                <input type="text" v-model="school" class="border-green border rounded w-full px-2" @click="clickTextBox">
              </div>
            </div>
            <div class="flex flex-col place-items-center mt-5 basis-1/4"> <!--Avatar-->
              <img src="../../assets/images/user.jpg" alt="Avatar" class="w-36 h-36 rounded-full me-3"/>
              <button class="bg-green text-white px-7 mx-14 mt-5 py-1 rounded-3xl">Change Avatar</button>
            </div>
          </div>
          <div class="mt-5"> <!--Bio-->
            <label>Bio<br></label>
            <textarea rows="4" v-model="bio" class="border-green border rounded w-full px-2" @click="clickTextBox"></textarea>
          </div>
          <button class="bg-green text-white px-12 mt-5 py-1 rounded-3xl" :disabled="isButtonDisabled">Save Changes</button>
        </form>
      </div>

      <div> <!--Email-->

        <div>
          <p class="font-bold text-xl border-b border-green mt-10">Email</p>
        </div>

        <form @submit.prevent="codeSent">
          <div class="flex">
            <div class="basis-4/5 mt-5">
              <label>Email<br></label>
              <input type="text" v-model="email" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
            </div>

            <div class="mt-10 ms-10 bg-green text-white px-12 rounded-3xl">
              <button class="py-1 sendCode" :disabled="isDisabled"> Send Code</button>
            </div>

          </div>
          </form>
          <form @submit.prevent="saveChanges">
          <div>

            <div class="mr-20 mt-5">
              <label>Code<br></label>
              <input :disabled="isDisabled" type="text" value="000 - 000" class="border-green border rounded w-full px-2" @click="clickTextBox"  @input="handleInputChange" >
              <p class="opacity-60 text-xs my-2">Insert the 6 digit code sent to your email to confirm the change of email</p>
            </div>

          </div>

          <div>
            <button class="bg-green text-white px-12  mt-5 py-1 rounded-3xl" :disabled="isDisabled">Update Email</button>
          </div>
        </form>
      </div>

      <div> <!--Password-->

        <div>
          <p class="font-bold text-xl border-b border-green mt-10">Change Password</p>
        </div>

        <form @submit.prevent="saveChanges">
          <div>

            <div class="mr-20 mt-5">
              <label>Current Password<br></label>
              <input type="password" v-model="password" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
            </div>

          </div>

          <div class="mr-20 mt-5">

            <div class="flex">

              <div class="basis-1/2 mt-5 me-10">
                <label>New Password<br></label>
                <input type="password" v-model="newPassword" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
              </div>

              <div class="basis-1/2 mt-5">
                <label>Confirm New Password<br></label>
                <input type="password" v-model="confirmNewPassword" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
              </div>
            </div>

          </div>
          <p class="opacity-60 text-xs my-2">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>

          <div>
            <button class="bg-green text-white px-8 py-1 mt-5 rounded-3xl" :disabled="isDisabled">Update Password</button>
          </div>
        </form>
      </div>



  </div>

</div>

</template>

<script>

export default {
  methods: {
    saveChanges(){
      alert('Your changes has been successfully saved!');
    },
    codeSent(){
      alert('Code has been sent to your email!');
    },
    maskPasswordValue(password) {
      return password.replace(/./g, '*');
    },
    maskPassword(event, property) {
      this[property] = event.target.value;
    },
    handleInputChange(value) {
      this.inputValue = value;
    }
  },
  data() {
    return {
      inputValue: " ",
      firstName: 'Kovie',
      lastName: 'Niño',
      username: '@Tofudubu',
      school: 'De La Salle University',
      email: 'thegamingkovie@gmail.com',
      password: 'password',
      newPassword: 'password',
      confirmNewPassword: 'password',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Ultrices mi tempus imperdiet nulla malesuada.',
    };
  },
  computed: {
    isButtonDisabled() {
      return !this.firstName || !this.lastName || !this.username || !this.school || !this.bio || !this.email || !this.password;
    },
  }
}
</script>

<style scoped>
input[type="text"],
input[type="password"],
textarea {
  outline-color: green;
}

</style>
