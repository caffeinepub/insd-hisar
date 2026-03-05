import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type Course = {
    id : Nat;
    title : Text;
    description : Text;
    duration : Text; // Could be weeks, months, etc.
    level : Text; // Beginner, Intermediate, Advanced
    category : Text; // Fashion, Interior, etc.
  };

  type Enquiry = {
    name : Text;
    email : Text;
    phone : Text;
    courseInterest : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let courses = List.fromArray<Course>([
    {
      id = 1;
      title = "Fashion Design";
      description = "Learn the fundamentals of fashion design, including pattern making, sewing, and fashion illustration.";
      duration = "12 months";
      level = "Beginner";
      category = "Fashion";
    },
    {
      id = 2;
      title = "Interior Design";
      description = "Explore the principles of interior design, space planning, and materials selection.";
      duration = "18 months";
      level = "Intermediate";
      category = "Interior";
    },
    {
      id = 3;
      title = "Graphic Design";
      description = "Master graphic design tools and techniques for digital and print media.";
      duration = "9 months";
      level = "Beginner";
      category = "Graphic";
    },
    {
      id = 4;
      title = "Jewellery Design";
      description = "Learn the art of jewellery design, including sketching, CAD, and materials knowledge.";
      duration = "15 months";
      level = "Advanced";
      category = "Jewellery";
    },
    {
      id = 5;
      title = "Textile Design";
      description = "Study textile patterns, fabric selection, and surface embellishment techniques.";
      duration = "10 months";
      level = "Intermediate";
      category = "Textile";
    },
    {
      id = 6;
      title = "Film & Media";
      description = "Gain skills in film production, editing, and media communication.";
      duration = "12 months";
      level = "Beginner";
      category = "Media";
    },
  ]);
  let enquiries = List.empty<Enquiry>();

  public query ({ caller }) func getCourses() : async [Course] {
    courses.toArray();
  };

  public shared ({ caller }) func submitEnquiry(name : Text, email : Text, phone : Text, courseInterest : Text, message : Text) : async () {
    let newEnquiry : Enquiry = {
      name;
      email;
      phone;
      courseInterest;
      message;
      timestamp = Time.now();
    };
    enquiries.add(newEnquiry);
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.toArray();
  };

  public query ({ caller }) func getCourseById(id : Nat) : async Course {
    let filtered = courses.toArray().filter(func(c) { c.id == id });
    if (filtered.size() == 0) {
      Runtime.trap("Course does not exist");
    } else {
      filtered[0];
    };
  };
};
