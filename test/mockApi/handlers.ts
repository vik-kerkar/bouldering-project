import { rest } from "msw";
import "dotenv/config";

import { autoCompleteResponses } from "./responses";

const autocompleteApiUrl = process.env.EXPO_PUBLIC_AUTOCOMPLETE_API_URL;
const geocodeApiUrl = process.env.EXPO_PUBLIC_REVERSE_GEOCODE_API_URL;
const destinationApiUrl = process.env.EXPO_PUBLIC_DESTINATION_API_URL;

export const handlers = [
  rest.get(autocompleteApiUrl!, (req, res, ctx) => {
    const url = new URL(req.url);

    const query = url.searchParams.get("text");

    if (query && autoCompleteResponses[query]) {
      return res(ctx.status(200), ctx.json(autoCompleteResponses[query]));
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
    if (lat === "15.3333" && lon === "76.4167") {
      return res(
        ctx.status(200),
        ctx.json({
          features: [
            {
              properties: {
                place_id: "50000679",
                country: "India",
                state: "Karnataka",
                county_district: "Hampi",
                county: "Bellary",
                city: "Hampi",
                address_line1: "Hampi",
                lat: 15.3333,
                lon: 76.4167,
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
  rest.get(destinationApiUrl!, (req, res, ctx) => {
    const url = new URL(req.url);
    const placeId = url.searchParams.get("place_id");

    if (placeId === "eq.50000679") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 5,
            created_at: "2026-06-01T14:12:48.243427+00:00",
            name: "Hampi",
            description:
              "great spot, wide expansive hill with boulders and steep climbs",
            url: null,
            place_id: "560079",
            lat: 15.3333,
            lon: 76.4167,
            state: "Karnataka",
            county: "Bellary",
            country: "India",
            district: "Hampi",
            nearest_town_city: "Hospet",
            getting_there: "400km from Bangalore",
            misc_info: "winter",
          },
        ]),
      );
    }

    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post(destinationApiUrl!, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 5,
          created_at: "2026-06-01T14:12:48.243427+00:00",
          name: "Ravugodlu",
          description:
            "great spot, wide expansive hill with boulders and steep climbs",
          url: null,
          place_id:
            "51000979f30a60534059c65eded2207f2940f00103f90145ee690701000000c002079203093536303131362b696e",
          lat: 12.7482973,
          long: 77.5006684,
          state: "Karnataka",
          county: "Bengaluru Urban",
          country: "India",
          district: "Bangalore South",
          nearest_town_city: "Kanakpura",
          getting_there: "39km from Bangalore",
          misc_info: "winter",
        },
      ]),
    );
  }),
];
