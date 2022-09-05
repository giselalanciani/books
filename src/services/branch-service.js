class BranchService {
  async getBranches() {
    const response = await fetch(`http://localhost:3000/api/branch`);

    return await response.json();
  }

  async getBranch(id) {
    const response = await fetch(`http://localhost:3000/api/branch/${id}`);

    return await response.json();
  }

  async createBranch(branch) {
    const response = await fetch("http://localhost:3000/api/branch", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: branch.name,
        country: branch.country,
        state: branch.state,
        city: branch.city,
        street: branch.street,
      }),
    });
    return response;
  }

  async updateBranch(id, branch) {
    const response = await fetch(`http://localhost:3000/api/branch/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: branch.name,
        country: branch.country,
        state: branch.state,
        city: branch.city,
        street: branch.street,
      }),
    });
    return response;
  }

  async deleteBranch(id) {
    const response = await fetch(`http://localhost:3000/api/branch/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
}

export { BranchService };
