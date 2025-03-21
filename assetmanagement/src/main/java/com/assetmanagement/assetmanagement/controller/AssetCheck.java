//import javax.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "asset_checks")
//public class AssetCheck {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "asset_id")
//    private Asset asset;
//
//    private String status; // Khớp / Lệch
//    private String notes;  // ghi chú nếu lệch
//    private LocalDateTime checkedAt; // Thời gian kiểm kê
//
//    // Getters and Setters
//    // ...
//}