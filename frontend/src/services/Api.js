const baseUrl = 'http://localhost:5000/api/v1/';

export default {
  async getUsers() {
    try {
      const url = `${baseUrl}userds/`;
      const res = await fetch(url);
      if (!res?.ok) throw new Error(res?.message || 'Something went wrong');
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  },

  async signupUser(user) {
    try {
      const url = `${baseUrl}users/signup`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!res?.ok) throw new Error(res?.message || 'Something went wrong');
      return res;
    } catch (err) {
      console.error(err);
    }
  },

  updateUser() {
    // UPDATE
  },

  deleteUser() {
    // DELETE
  },
};
