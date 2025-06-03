const BASE_URL = "https://api.alrededor.mooo.com";

//"https://se-register-api.en.tripleten-services.com/v1"
export const register = async (email, password) => {
  try {
    //401
    const checkResponse = await fetch(`${BASE_URL}/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const checkJson = await checkResponse.json();
    if (checkJson.exists) {
      throw new Error("El correo ya está registrado");
    }

    const response = await fetch(`${BASE_URL}/signinup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 400) {
      throw new Error("uno de los campos se rellenó de forma incorrecta");
    }
    

    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return { error: err.message };
    
  }
};

export const authorize = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 400 || response.status === 401) {
      throw new Error("Uy, algo salió mal. Por favor, inténtalo de nuevo.");
    }

    const responseJson = await response.json();
     
    if (responseJson.token) {
      localStorage.setItem("token", responseJson.token);
    }
    return responseJson;
  } catch (err) {
    return { error: err.message };
 
  }
};

export const userInfo = async () => {
    const token = localStorage.getItem("token");

  if (!token) {
    return { error: "No hay token disponible" };
  }
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 400) {
      throw new Error(
        "400 - Token no proporcionado o proporcionado en el formato incorrecto"
      );
    }

    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log(err);
  }
};
