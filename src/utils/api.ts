

export const fetchLights = async () => {
    console.log("fetching lights")
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}trafficlights`
    );

    return response.json();
}

export const addLight = async (light: any) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}addtrafficlight`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(light),
        }
        
    );
    return response.json();
}

export const updateLightDetails = async (light: any) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}updatetrafficlight/${light.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(light),
        }
        
    );
    return response.json();
}

export const fetchLightById = async (id: number) => {
    console.log("fetch by id called")
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}trafficlight/${id}`
    );
    console.log("fetch by id called")
    return response.json();
}

export const deleteLightById = async (id: number) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}deletetrafficlight/${id}`,
        {
            method: "DELETE",
        }
    );
    return response.json();
}

export const deleteScheduleById = async (id: number) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}deleteschedule/${id}`,
        {
            method: "DELETE",
        }
    );
    return response.json();
}


export const updatetrafficlightColor = async (body: any) => {
const {lightId, color} = body
    console.log(body,color, lightId, "body", "updatelightcolor")
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}updatetrafficlightcolor/${lightId}?color=${color}`,   
        {
            method: "PUT",
        }
    );
    return response.json();
}
