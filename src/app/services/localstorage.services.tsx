export const STORAGE = {
    set: (name: string, value: any, options: { parsed?: boolean } = { parsed: false }): boolean => {
      try {
        const { parsed } = options;
        if (parsed) localStorage.setItem(name, JSON.stringify(value));
        localStorage.setItem(name, value);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    get: (name: string, options: { parse?: boolean } = { parse: false }): any => {
      try {
        const { parse } = options;
        const value = localStorage.getItem(name);
        if (value === null) return null;
        return parse ? JSON.parse(value) : value;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  };
  