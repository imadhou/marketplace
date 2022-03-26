import ToImplement;
public class Test {


    public static void main(String[] args){

        ToImplement test = new ToImplement();
        print(test.GetAllTransactions("localhost:3000/api/transactions"));
    }
}
