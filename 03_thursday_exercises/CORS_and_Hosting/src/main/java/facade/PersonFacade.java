package facade;

import entity.Person;
import exception.PersonNotFoundException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

/**
 *
 * @author ibenk
 */
public class PersonFacade {

    private static PersonFacade instance;
    private static EntityManagerFactory emf;

    private PersonFacade() {
    }

    public static PersonFacade getPersonFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new PersonFacade();
        }
        return instance;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public long getCount() {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            long count = (long) em.createNamedQuery("Person.getCount").getSingleResult();
            em.getTransaction().commit();
            return count;
        } finally {
            em.close();
        }

    }

    public Person addPerson(Person person) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(person);
            em.getTransaction().commit();
            return person;
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw new IllegalArgumentException("Something went wrong when persisting Person: " + e.getMessage());
        } finally {
            em.close();
        }
    }

    public Person deletePerson(long id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Person person = em.find(Person.class, id);
            em.remove(person);
            em.getTransaction().commit();
            return person;
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw new IllegalArgumentException("Could not delete, provided id does not exist");
        } finally {
            em.close();
        }
    }

    public Person getPerson(long id) throws PersonNotFoundException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Person person = em.find(Person.class, id);
            em.getTransaction().commit();
            if (person != null) {
                return person;
            } else {
                throw new PersonNotFoundException("No person with provided id found");
            }
        } finally {
            em.close();
        }
    }

    public List<Person> getAllPeople() {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            List<Person> people = em.createNamedQuery("Person.getAll").getResultList();
            em.getTransaction().commit();
            return people;
        } finally {
            em.close();
        }
    }

}
