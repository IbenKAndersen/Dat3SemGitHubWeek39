package exception;

/**
 *
 * @author ibenk
 */
public class PersonNotFoundException extends Exception {
    public PersonNotFoundException(String message) {
        super(message);
    }
}
