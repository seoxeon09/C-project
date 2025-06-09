package hello_spring.hello_spring;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {

    @PostMapping("/hello")
    public String hello(@RequestBody String message) {
        System.out.println("클라이언트로부터 받은 메시지: " + message);
        return "api 연결 완료zz";
    }
}
