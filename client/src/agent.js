const API_ROOT = "/api";

const getLtik = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ltik = searchParams.get("ltik");
  if (!ltik) throw new Error("Missing lti key.");
  return ltik;
};

const fetchOptions = {
  headers: {
    Authorization: `Bearer ${getLtik()}`,
  },
};

const requests = {
  get: async (url) => {
    try {
      const res = await window.fetch(`${API_ROOT}${url}`, fetchOptions);
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  },
};

const Canvas = {
  status: () => {
    return requests.get(`/canvas-status/`);
  },
};

const getContext = () => requests.get(`/context/`);

export default {
  Canvas,
  getContext,
};
