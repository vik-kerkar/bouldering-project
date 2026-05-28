import { rest } from "msw";
import "dotenv/config";

const autocompleteApiUrl = process.env.EXPO_PUBLIC_AUTOCOMPLETE_API_URL;
const geocodeApiUrl = process.env.EXPO_PUBLIC_REVERSE_GEOCODE_API_URL;

export const handlers = [
  rest.get(autocompleteApiUrl!, (req, res, ctx) => {
    const url = new URL(req.url);

    const query = url.searchParams.get("text");

    if (query === "Ravug") {
      return res(
        ctx.status(200),
        ctx.json({
          features: [
            {
              properties: {
                place_id: "50000678",
                country: "India",
                state: "Karnataka",
                county_district: "Bangalore South",
                county: "Bangalore Urban",
                city: "Ravugodlu",
                address_line1: "Ravugodlu",
                lat: 12.9716,
                lon: 77.5946,
              },
            },
          ],
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        features: [],
      }),
    );
  }),
  rest.get(geocodeApiUrl!, (req, res, ctx) => {
    const url = new URL(req.url);

    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    if (lat === "123" && lon === "456") {
      return res(
        ctx.status(400),
        ctx.json({
          statusCode: 400,
          error: "Bad Request",
          message: '"lat" must be less than or equal to 90',
        }),
      );
    }

    if (lat === "12.9716" && lon === "77.5946") {
      return res(
        ctx.status(200),
        ctx.json({
          features: [
            {
              properties: {
                place_id: "50000678",
                country: "India",
                state: "Karnataka",
                county_district: "Bangalore South",
                county: "Bangalore Urban",
                city: "Ravugodlu",
                address_line1: "Ravugodlu",
                lat: 12.9716,
                lon: 77.5946,
              },
            },
          ],
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        features: [],
      }),
    );
  }),
];
