package hello_spring.hello_spring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;

@RestController
public class MineController {

    @GetMapping("/mine")
    public ResponseEntity<String> checkMine(@RequestParam int x, @RequestParam int y) {
        try {
            ProcessBuilder pb = new ProcessBuilder("./native/minesweeper", String.valueOf(x), String.valueOf(y));
            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            int exitCode = process.waitFor();
            return ResponseEntity.ok(output.toString().trim());

        } catch (IOException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류: " + e.getMessage());
        }
    }
}
