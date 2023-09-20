import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as addressService from "./services/addressService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const create = async (request) => {
  const formData = await request.formData();

  const sender = formData.get("sender");
  const message = formData.get("message");

  await addressService.create(sender, message);
  return redirectTo("/");
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/") {
    const data = {
      messages: await addressService.findAll(),
    };
    return new Response(await renderFile("index.eta", data), responseDetails);
  } else if (request.method === "POST") {
    return await create(request);
  }
};

serve(handleRequest, { port: 7777 });

// const deleteAddress = async (request) => {
//   const url = new URL(request.url);
//   const parts = url.pathname.split("/");
//   const id = parts[2];
//   await addressService.deleteById(id);

//   return redirectTo("/");
// };

// const listAddresses = async () => {
//   const data = {
//     addresses: await addressService.findAll(),
//   };

//   return new Response(await renderFile("index.eta", data), responseDetails);
// };

// const measure = async () => {
//   const data = {
//     addresses: await addressService.measure(),
//   };
//   return new Response(await renderFile("index.eta", data), responseDetails);
// };
