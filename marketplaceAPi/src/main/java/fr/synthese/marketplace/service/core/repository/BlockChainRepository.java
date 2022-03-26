package fr.synthese.marketplace.service.core.repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

public class BlockChainRepository {
    public String getAllTransactions(String URL){
        java.net.URL url;
        HttpURLConnection con = null;
        try {
            url = new URL(URL);
            con = (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            con.setRequestMethod("GET");
        } catch (ProtocolException e) {
            e.printStackTrace();
        }

        try {
            int status = con.getResponseCode();
        } catch (IOException e) {
            e.printStackTrace();
        }

        BufferedReader in = null;
        String inputLine;
        StringBuffer content = new StringBuffer();
        try {
            in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));

            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }


        con.disconnect();

        return content.toString();

    }
}
