namespace backend.Dtos
{
    public class EntertainerWithBookingDto
    {
        public int EntertainerId { get; set; }
        public string EntStageName { get; set; }
        public string EntStreetAddress { get; set; }
        public string EntCity { get; set; }
        public string EntState { get; set; }
        public string EntZipCode { get; set; }
        public string EntPhoneNumber { get; set; }
        public string? EntWebPage { get; set; }
        public string? EntEmailAddress { get; set; }
        public string DateEntered { get; set; }

        public int BookingCount { get; set; }
    }
}
