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
                  <input type="text" placeholder="Kovie" class="border-green border rounded w-full" v-model="firstName">
                </div>

                <div class="basis-1/2 mt-5">
                  <label>Last Name<br></label>
                  <input type="text" placeholder="Niño" class="border-green border rounded w-full" v-model="lastName">
                </div>

              </div>

              <div>

                <div class="mt-5"> <!--Username-->
                  <label>Username<br></label>
                  <input type="text" placeholder="@Tofudubu" class="border-green border rounded w-full" v-model="username">
                </div>

              </div>

              <div>

                <div class="mt-5"> <!--School-->
                  <label>School/University<br></label>
                  <input type="text" placeholder="De La Salle University" class="border-green border rounded w-full" v-model="school">
                </div>

              </div>

            </div>

            <div class="flex flex-col place-items-center mt-5 basis-1/4"> <!--Avatar-->
              <img src="../../assets/images/user.jpg" alt="Avatar" class="w-36 h-36 rounded-full me-3"/>
              <button class="bg-green text-white px-7 mx-14 mt-5 rounded-3xl">Change Avatar</button>
            </div>

          </div>

          <div class="mt-5"> <!--Bio-->
            <label>Bio<br></label>
            <textarea rows="4" class="me-10 ps-2 border-green border rounded w-full" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Ultrices mi tempus imperdiet nulla malesuada." v-model="school">
            </textarea>
          </div>

          <button class="bg-green text-white px-12  mt-5 rounded-3xl">Save Changes</button>
        </form>
      </div>

      <div> <!--Email-->

        <div>
          <p class="font-bold text-xl border-b border-green mt-10">Email</p>
        </div>

        <form @submit.prevent="saveChanges">
          <div class="flex">
            <div class="basis-3/4 mt-5">
              <label>Email<br></label>
              <input type="text" placeholder="kovie_nino@dlsu.edu.ph" class="border-green border rounded w-full" v-model="email" required>
            </div>

            <div class="mt-10 mx-14 bg-green text-white px-12 rounded-3xl">
              <button> Send Code</button>
            </div>

          </div>

          <div>

            <div class="mr-20 mt-5">
              <label>Code<br></label>
              <input type="text" placeholder="000 - 000" class="border-green border rounded w-full" v-model="code">
              <p class="opacity-60 my-2">Insert the 6 digit code sent to your email to confirm the change of email</p>
            </div>

          </div>

          <div>
            <button class="bg-green text-white px-12  mt-5 rounded-3xl">Update Email</button>
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
              <input type="password" placeholder="**********" class="border-green border rounded w-full" v-model="currentPassword" required>
            </div>

          </div>

          <div class="mr-20 mt-5">

            <div class="flex">

              <div class="basis-1/2 mt-5 me-10">
                <label>New Password<br></label>
                <input type="password" placeholder="************" class="border-green border rounded w-full" v-model="newPassword">
              </div>

              <div class="basis-1/2 mt-5">
                <label>Confirm New Password<br></label>
                <input type="password" placeholder="************" class="border-green border rounded w-full" v-model="confirmNewPassword">
              </div>
            </div>

          </div>
          <p class="opacity-60 my-2">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>

          <div>
            <button class="bg-green text-white px-8  mt-5 rounded-3xl">Update Password</button>
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
    maskPasswordValue(password) {
      return password.replace(/./g, '*');
    },
    maskPassword(event, property) {
      this[property] = event.target.value;
    }
  },
}
</script>
