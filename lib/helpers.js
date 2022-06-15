export const baseUrl =  process.env.VERCEL_ENV === 'development'    ? 'http://localhost:3000' :
                        process.env.VERCEL_ENV === 'preview'        ? `https://${process.env.VERCEL_URL}` :
                                                                      "https://njf.dev";

export function SortDictDescending(dict_old) {
    // Create items array
    var items = Object.keys(dict_old).map(function(key) {
        return [key, dict_old[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    // Convert back to a dictionary
    let dict = [];
    items.forEach((item) => {
        dict[item[0]] = item[1];
    });
    return dict;
}

export function DictToJSON(dict) {
    let json = "{";
    for (const key in dict) {
        const value = dict[key];
        json += `"${key}": ${value},`;
    }
    json = json.slice(0, -1) + '}';
    json = JSON.parse(json);
    return json;
}

export function JSONToDict(json) {
    let dict = [];
    for (const key in json) {
        const value = json[key];
        dict[key] = value;
    }
    return dict;
}