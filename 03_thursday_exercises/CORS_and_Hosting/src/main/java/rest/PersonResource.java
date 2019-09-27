package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.PersonDTO;
import entity.Person;
import utils.EMF_Creator;
import facade.PersonFacade;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author ibenk
 */
@Path("person")
public class PersonResource {

    private static final EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory(
            "pu",
            "jdbc:mysql://localhost:3307/cors",
            "dev",
            "ax2",
            EMF_Creator.Strategy.CREATE);
    private static final PersonFacade FACADE = PersonFacade.getPersonFacade(EMF);
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private Person p1 = new Person("Iben");

    public PersonResource() {
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getJson() {
//        return "{\"name\" : \"Peter Pan\"}";
//    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPersons() {
        return Response.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .entity(GSON.toJson(FACADE.getAllPeople())).build();
    }

//    @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public String addPerson(String p) {
//        PersonDTO personDTO = GSON.fromJson(p, PersonDTO.class);
//        Person person = FACADE.addPerson(personDTO);
//        return GSON.toJson(person);
//    }
}
