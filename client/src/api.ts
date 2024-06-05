//export const url: string = "https://retinoweb-server.vercel.app";
//export const url: string = "https://heinreach-server.vercel.app";
export const url: string = "http://localhost:3000";

export async function LoginUser(email: string, password: string) {
    const requestBody = {
        email: email,
        password: password,
    };

    try {
        const res = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: 'include'
        });

        const data = await res.json();
        

        if (!res.ok) {
            throw {
                message: data.error,
                statusText: res.statusText,
                status: res.status
            }
        }

        return data;

    } catch (error) {
      if (error instanceof Error) {
        console.error("Login error: " + error.message);
        throw error;
    }
        

    }
}

export async function registerUser(firstname: string, lastname: string, email: string, password: string) {
    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
    };

    try {
        const res = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: 'include'
        });

        const data = await res.json();
        console.log(data)
        if (!res.ok) {
            throw {
                message: data.error,
                statusText: res.statusText,
                status: res.status
            }
        }

        return data;


    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup error: " + error.message);
        throw error;
      }
    }
}

export async function logoutUser(): Promise<void> {
    try {
        const res = await fetch(`${url}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        if (res.ok) {
            console.log('logged out');
        }

        if (!res.ok) {
            throw {
                message: res.status,
                statusText: res.statusText,
                status: res.status
            }
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

// Function to add a new blog
export const addBlog = async (image: string, title: string, author: string, content: string, date: string, tag: string) => {
    try {
        const response = await fetch(`${url}/addBlog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: image, title: title, author: author, content: content, date: date, tag: tag }),
        });

        if (!response.ok) {
            throw new Error('Failed to add blog');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding blog:', error.message);
        throw error;
    }
  }
};

// Function to get all blogs
export const getAllBlogs = async () => {
    try {
        const response = await fetch(`${url}/getBlogs`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching blogs:', error.message);
        throw error;
      }
    }
};

// Function to get blog details by ID
export const getBlogById = async (id: string) => {
    try {
        const response = await fetch(`${url}/getBlog/${id}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blog details');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching blog details:', error.message);
        throw error;
    }
  }
};

// Function to delete a blog
export const deleteBlog = async (id: string) => {
    try {
        const response = await fetch(`${url}/deleteBlog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogItemId: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting blog:', error.message);
        throw error;
      }
    }
};

// Function to update a blog
export const updateBlog = async (id: string, image: string, title: string, author: string, content: string, date: string, tag: string) => {
    try {
        const response = await fetch(`${url}/updateBlog`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogItemId: id, image: image, title: title, author: author, content: content, date: date, tag: tag }),
        });

        if (!response.ok) {
            throw new Error('Failed to update blog');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating blog:', error.message);
        throw error;
      }
    }
};

// Function to add a new nutrition record
export const addNutritionRecord = async (foodsWithDate: { food: string; date: string }[]) => {
    try {
      const response = await fetch(`${url}/addNutrition`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foods: foodsWithDate }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add nutrition record');
      }
  
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding nutrition record:', error.message);
        throw error;
      }
    }
  };
  

// Function to get all nutrition records
export const getAllNutritionRecords = async () => {
    try {
        const response = await fetch(`${url}/getNutritions`, {
            method: 'POST',
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch nutrition records');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching nutrition records:', error.message);
        throw error;
      }
    }
};

// Function to update a nutrition record
export const updateNutritionRecord = async (id: string, food: string, date: string) => {
    try {
        const response = await fetch(`${url}/updateNutrition`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ NutritionId: id, food: food, date: date }),
        });

        if (!response.ok) {
            throw new Error('Failed to update nutrition record');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating nutrition record:', error.message);
        throw error;
      }
    }
};

// Function to delete a nutrition record
export const deleteNutritionRecord = async (nutritionId: string) => {
    try {
        const response = await fetch(`${url}/deleteNutrition`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ NutritionId: nutritionId }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete nutrition record');
        }

        return await response.json();
    }catch (error) {
      if (error instanceof Error) {
          console.error('Error deleting nutrition record:', error.message);
          throw error;
      } else {
          throw new Error('Unknown error occurred while deleting nutrition record');
      }
  }
};

// Function to add a new appointment
export const addAppointment = async (clinic: string, email: string, number: number, description: string, message: string, name: string, date: string) => {
    try {
        const response = await fetch(`${url}/addAppointment`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clinic: clinic, email: email, number: number, description: description, message: message, name: name, date: date }),
        });

        if (!response.ok) {
            throw new Error('Failed to add appointment');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding appointment:', error.message);
        throw error;
      }
    }
};

// Function to get all appointments
export const getAllAppointments = async () => {
    try {
        const response = await fetch(`${url}/getAppointments`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching appointments:', error.message);
        throw error;
      }
    }
};

// Function to update an appointment
export const updateAppointment = async (id: string, result: string) => {
    try {
        const response = await fetch(`${url}/updateAppointment`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, result: result }),
        });

        if (!response.ok) {
            throw new Error('Failed to update appointment');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating appointment:', error.message);
        throw error;
      }
    }
};

// Function to delete an appointment
export const deleteAppointment = async (appointmentId: string) => {
    try {
        const response = await fetch(`${url}/deleteAppointment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: appointmentId }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete appointment');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting appointment:', error.message);
        throw error;
      }
    }
};

// Function to add a new checkup
export const addCheckup = async (date: string) => {
    try {
        const response = await fetch(`${url}/addCheckup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date }),
        });

        if (!response.ok) {
            throw new Error('Failed to add checkup');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding checkup:', error.message);
        throw error;
      }
    }
};

// Function to get all checkups
export const getAllCheckups = async () => {
    try {
        const response = await fetch(`${url}/getCheckups`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch checkups');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching checkups:', error.message);
        throw error;
      }
    }
};

// Function to update a checkup
export const updateCheckup = async (clinic: string, id: string, glucose: number, hemoglobin: number, urinalysis: number) => {
    try {
        const response = await fetch(`${url}/updateCheckup`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clinic: clinic, checkupId: id, glucose: glucose, hemoglobin: hemoglobin, urinalysis: urinalysis }),
        });

        if (!response.ok) {
            throw new Error('Failed to update checkup');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating checkup:', error.message);
        throw error;
      }
    }
};

// Function to delete a checkup
export const deleteCheckup = async (id: string) => {
    try {
        const response = await fetch(`${url}/deleteCheckup`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkupId: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete checkup');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting checkup:', error.message);
        throw error;
      }
    }
};

// Function to add a new eye screening
export const addEyeScreening = async (date: string) => {
    try {
        const response = await fetch(`${url}/addEyeScreening`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date }),
        });

        if (!response.ok) {
            throw new Error('Failed to add eye screening');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding eye screening:', error.message);
        throw error;
      }
    }
};

// Function to get all eye screenings
export const getAllEyeScreenings = async () => {
    try {
        const response = await fetch(`${url}/getEyeScreenings`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch eye screenings');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching eye screenings:', error.message);
        throw error;
      }
    }
};

// Function to update an eye screening
export const updateEyeScreening = async (id: string, clinic: string, risk: number, visual: number, intraocular: number, serum: number) => {
    try {
        const response = await fetch(`${url}/updateEyeScreening`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ EyeScreeningId: id, clinic: clinic, visual: visual, intraocular: intraocular, serum: serum, risk: risk }),
        });

        if (!response.ok) {
            throw new Error('Failed to update eye screening');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating eye screening:', error.message);
        throw error;
      }
    }
};

// Function to delete an eye screening
export const deleteEyeScreening = async (eyeScreeningId: string) => {
    try {
        const response = await fetch(`${url}/deleteEyeScreening`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eyeScreeningId }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete eye screening');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting eye screening:', error.message);
        throw error;
      }
    }
};

// Function to add a new medication record
export const addMedication = async (date: string, clinic: string, result: string) => {
    try {
        const response = await fetch(`${url}/addMedication`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ result: result, date: date, clinic: clinic }),
        });

        if (!response.ok) {
            throw new Error('Failed to add medication record');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding medication record:', error.message);
        throw error;
      }
    }
};

// Function to get all medication records
export const getAllMedicationRecords = async () => {
    try {
        const response = await fetch(`${url}/getMedications`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch medication records');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching medication records:', error.message);
        throw error;
      }
    }
};

// Function to update a medication record
export const updateMedicationRecord = async (date: string, clinic: string, result: string, id: string) => {
    try {
        const response = await fetch(`${url}/updateMedicationRecord`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date, clinic: clinic, result: result, id: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to update medication record');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating medication record:', error.message);
        throw error;
      }
    }
};

// Function to delete a medication record
export const deleteMedicationRecord = async (medicationId: string) => {
    try {
        const response = await fetch(`${url}/deleteMedicationRecord`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: medicationId }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete medication record');
        }

        return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting medication record:', error.message);
        throw error;
      }
    }
};

